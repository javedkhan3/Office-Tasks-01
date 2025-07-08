// components/Loader.jsx
const Loader = ({ text = "Loading..." }) => (
  <div className="text-center py-20">
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
    <p className="mt-4 text-gray-600 dark:text-gray-300">{text}</p>
  </div>
);

export default Loader;
