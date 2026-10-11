import { CircleQuestionMark  } from "lucide-react";

export default function NoResults( { message } : { message: string }) {
	return (
		<div className="text-center">
			<CircleQuestionMark className="mx-auto mb-2" size={32} />
			<p className="text-muted-foreground">{message}</p>
		</div>
	);
}