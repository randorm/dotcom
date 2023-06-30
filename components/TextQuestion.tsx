export default function TextQuestion() {
  return (
    <div className="area">
      <div className="flex justify-between items-center mb-1 p-1">
        <p>Text question</p>
        <div className="grid grid-cols-3">
          <img src="../edit.svg" alt="" />
          <img src="../swap.svg" alt="" />
          <img src="../delete.svg" alt="" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-52 p-1">
        <div className="area text-xxs text-opacity-50 text-black">
          Sample (optional)
        </div>
        <div className="text-sm">
          <div className="flex items-center">
            <img src="../checkbox.svg" alt="" />
            <div className="ml-1 text-sm">Required</div>
          </div>
          <div className="flex items-center">
            <img src="../drop-down-menu.svg" alt="" />
            <div className="ml-1 text-sm">Text</div>
          </div>
        </div>
      </div>
    </div>
  );
}
