import Bio from "@/components/Bio";
import Question from "@/components/Question";
import SelectionButton from "@/components/SelectionButton";
export default function Feed() {
  return (
    <div className="flex flex-col items-center">
      <Bio
        name="John Doe"
        info="male, 19 y.o"
        bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Question question="What is your name?" answer="John" />
      <SelectionButton />
    </div>
  );
}
