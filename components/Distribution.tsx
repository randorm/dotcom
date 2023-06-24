import Button from "./Button";

export interface PropsType {
    distributionName: string;
    state: string;
    color: string;
}

export default function Distribution({distributionName, state, color}: PropsType) {
    return (
        <div className="distributionSection">
            <div className="ml-4">
                <p className="">{distributionName}</p>
                <div className={`${color} text-center text-xxs rounded-md w-16`}>{state}</div>
            </div>
            <Button text="View" />
        </div>
    );
}