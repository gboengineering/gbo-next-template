interface Props {
  desc: string;
  value: number;
}

export default function StatCard({ desc, value }: Props) {
  return (
    <div className="px-4 py-5 sm:p-6">
      <dt className="text-base font-normal text-gray-900">{desc}</dt>
      <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
          {value}
        </div>
      </dd>
    </div>
  );
}
