export default function DataCard(props:any) {
  return (
    <div className="lg:w-[90%] w-[95%] mx-4 my-2 p-4 lg:mx-2 rounded-lg bg-white flex flex-col items-start justify-start h-40 lg:h-60">
      <h1 className="text-blue-600 text-xl">Total {props.name} Cases</h1>
      <div className="w-full h-full flex items-center justify-center lg:text-6xl text-5xl font-bold">
        {props.value}
      </div>
    </div>
  );
}
