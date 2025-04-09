/**
 * Merges user configuration with default Next.js configuration
 * @param {import('next').NextConfig} nextConfig - Default Next.js configuration
 * @param {import('next').NextConfig} [userConfig] - Optional user-provided configuration
 * @returns {import('next').NextConfig} Merged configuration
 */
function mergeConfig(nextConfig, userConfig) {
  // Early return if no user config to avoid unnecessary object creation
  if (!userConfig) {
    return nextConfig;
  }

  // Create a shallow copy of the base config
  const mergedConfig = { ...nextConfig };

  // Merge user config properties
  Object.entries(userConfig).forEach(([key, value]) => {
    if (
      typeof mergedConfig[key] === 'object' &&
      !Array.isArray(mergedConfig[key]) &&
      value !== null
    ) {
      mergedConfig[key] = {
        ...mergedConfig[key],
        ...value,
      };
    } else {
      mergedConfig[key] = value;
    }
  });

  return mergedConfig;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    // Minimal experimental features for stable build
    webpackBuildWorker: false,
  },
};

let userConfig;
try {
  userConfig = await import('./v0-user-next.config');
} catch (error) {
  // Log only in development for better debugging
  if (process.env.NODE_ENV === 'development') {
    console.debug('No user configuration found, using defaults');
  }
}

export default mergeConfig(nextConfig, userConfig?.default);
