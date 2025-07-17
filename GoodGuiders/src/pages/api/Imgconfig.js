const imageModules = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,gif}', { eager: true });
const IMAGE_URLS = Object.fromEntries(
  Object.entries(imageModules).map(([path, module]) => [
    path.replace('/src/assets/images/', ''),
    module.default
  ])
);
export default IMAGE_URLS;