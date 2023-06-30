export default function ChoiseQuestion() {
  return (
    <div className="area w-6/12">
      <div className="flex justify-between items-center mb-1 px-2">
        <p>Choise question</p>
        <div className="grid grid-cols-3">
          <img src="../edit.svg" alt="" />
          <img src="../swap.svg" alt="" />
          <img src="../delete.svg" alt="" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-52 px-2">
        <div>
          <div className="flex items-center">
            <img src="../option.svg" alt="" />
            <div className="ml-1 text-sm">Option 1</div>
          </div>
          <div className="flex items-center opacity-40">
            <img src="../option.svg" alt="" />
            <div className="ml-1 text-sm">Option 2</div>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex items-center">
            <img src="../checkbox.svg" alt="" />
            <div className="ml-1 text-sm">Required</div>
          </div>
          <div className="flex items-center">
            <img src="../drop-down-menu.svg" alt="" />
            <div className="ml-1 text-sm">Multiple choice</div>
          </div>
        </div>
      </div>
    </div>
  );
}
