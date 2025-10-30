import Image from "next/image";

export default function ApiError() {
  return (
    <div className="flex flex-col w-full justify-center items-center mt-16 pt-10 gap-6">
      <Image src="/assets/icon-error.svg" alt="Error" width={42} height={50} />
      <h3 className="text-[52px] font-bricolage-grotesque font-bold">
        Something went wrong
      </h3>
      <p className="text-xl text-neutral-200 w-[554px] text-center">
        We couldn&apos;t connect to the server (API error). Please try again in
        a few moments.
      </p>
      <button
        className="flex px-4 py-3 gap-2.5 items-center bg-neutral-800 rounded-lg hover:bg-neutral-700"
        onClick={() => window.location.reload()}
      >
        <Image
          src="/assets/icon-retry.svg"
          alt="Refresh"
          width={16}
          height={16}
        />
        <span className="font-dm-sans">Refresh</span>
      </button>
    </div>
  );
}
