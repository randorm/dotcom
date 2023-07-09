export default function EmptyFeed() {
    return (
      <div className="h-screen w-screen bg-white z-10 flex flex-col justify-center items-center">
        <img className="mb-6 w-9/12" src="../short-logo-t-b.png" />
        <p className="text-black text-opacity-90 text-base font-extralight mb-20">
          You viewed all users. Come back later.
        </p>
      </div>
    );
  }