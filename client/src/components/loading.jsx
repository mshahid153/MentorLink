import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        colors={["#1451EE", "#1451EE", "#1451EE", "#1451EE", "#1451EE"]}
      />
    </div>
  );
};

export default Loading;
