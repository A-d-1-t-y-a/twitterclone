function SelectAndUnSelect({
  selectedImage,
  handleUnSelectImage,
  width,
  height,
}) {
  return (
    <div className="relative">
      <Image
        alt="failed"
        src={selectedImage}
        width={width}
        height={height}
        className="rounded-2xl aspect-video my-2"
      />
      <button
        className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black text-center text-white"
        onClick={handleUnSelectImage}
      >
        X
      </button>
    </div>
  );
}

export default SelectAndUnSelect;
