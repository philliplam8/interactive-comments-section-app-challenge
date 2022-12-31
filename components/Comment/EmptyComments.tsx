import { Card } from "../UI/Card";
export default function EmptyComments(): JSX.Element {
  return (
    <Card>
      <h1 className="text-xl font-medium text-darkBlue">No more comments!</h1>
      <div className="flex flex-row gap-2 border-b-2 border-lightGray">
        <p className="text-sm pb-4 text-grayishBlue">
          Feel free to add a new comment below
        </p>
        <p className="animate-bounce">👇</p>
      </div>
      <p className="pt-4 text-sm text-grayishBlue">
        {`Also congratulations on reaching this boundary edge case! 🎉 Are you a tester? 😜 Or just curious?`}
      </p>
    </Card>
  );
}
