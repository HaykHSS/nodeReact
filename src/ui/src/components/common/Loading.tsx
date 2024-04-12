const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full  bg-white opacity-50 absolute z-[999999]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
