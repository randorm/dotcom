export default function SelectionButton() {
    return (
        <div className="flex w-screen justify-center absolute bottom-0">
            <div className="bg-black bg-opacity-90 w-3/6 flex justify-center">
                <img src="./left-arrow.png" alt="Dislike the person" />
            </div>
            <div className="bg-green-600 bg-opacity-90 w-3/6 flex justify-center">
                <img src="./right-arrow.png" alt="Like the person" />
            </div>
        </div>
    );
}