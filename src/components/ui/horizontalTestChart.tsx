type BarData = {
    graduated: number;
    nonGraduated: number;
    absent: number;
    total: number;
};

type Props = {
data: BarData;
height?: number;
width?: number;
};

export function LegendItem(props : {color : string; children?: React.ReactNode}) {
  return(
    <div className="flex flex-row items-center gap-2">
      <div className={`h-3 w-3 ${props.color} rounded-full`}></div>
      <span>{props.children}</span>
    </div>
)}

export default function horizontalTestChart({
  data,
  height = 24
}: Props) {

  const noData =
    data.total -
    (data.graduated +
    data.nonGraduated +
    data.absent)

  const getWidth = (value: number) =>
    data.total === 0 ? 0 : (value / data.total) * 100;

  return (
    <> 
    <div
      className="flex flex-row rounded overflow-hidden border border-gray-300"
      style={{ height }}
    >
      <div
        className="bg-green-500"
        style={{ width: `${getWidth(data.graduated)}%` }}
      />
      <div
        className="bg-red-500"
        style={{ width: `${getWidth(data.nonGraduated)}%` }}
      />
      <div
        className="bg-gray-400"
        style={{ width: `${getWidth(data.absent)}%` }}
      />
      <div
        className="bg-black"
        style={{ width: `${getWidth(noData)}%` }}
      />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-1 mt-2 text-sm">
        <LegendItem color="bg-green-500">
          Évalués : {data.graduated} / {data.total}
        </LegendItem>
        <LegendItem color="bg-red-500">
          Non notés : {data.nonGraduated} / {data.total}
        </LegendItem>
        <LegendItem color="bg-gray-400">
          Absents : {data.absent} / {data.total}
        </LegendItem>
        <LegendItem color="bg-black">
          Reste à évaluer : {noData} / {data.total}
        </LegendItem>
      </div>
    </>
  );
}