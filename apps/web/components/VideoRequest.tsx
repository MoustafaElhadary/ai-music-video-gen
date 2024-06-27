import {
	SelectValue,
	SelectTrigger,
	SelectItem,
	SelectContent,
	Select,
} from '@web/components/ui/select';
import {Button} from '@web/components/ui/button';
import {Label} from '@web/components/ui/label';
import {Input} from '@web/components/ui/input';
import {Textarea} from '@web/components/ui/textarea';

export function VideoRequest() {
	return (
		<div className="max-w-4xl mx-auto p-8">
			<h1 className="text-2xl font-semibold mb-6">
				New request for Birthday Song
			</h1>
			<div className="space-y-8">
				<div>
					<h2 className="text-xl font-medium mb-4">
						Step 1: Type of video request
					</h2>
					<Select>
						<SelectTrigger className="border-2 border-gray-300 focus-within:border-purple-500">
							<SelectValue placeholder="Select type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="roast">Roast</SelectItem>
							<SelectItem value="birthday">Birthday</SelectItem>
							<SelectItem value="congratulations">Congratulations</SelectItem>
							<SelectItem value="pep-talk">Pep Talk</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<h2 className="text-xl font-medium mb-4">
						Step 2: Who&apos;s this video for?
					</h2>
					<div className="flex space-x-4 mb-4">
						<Button
							className="border-2 border-gray-300 focus:border-purple-500"
							variant="outline"
						>
							Someone else
						</Button>
						<Button
							className="border-2 border-gray-300 focus:border-purple-500"
							variant="outline"
						>
							Myself
						</Button>
					</div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="to-name">To (first name):</Label>
							<Input
								className="border-2 border-gray-300 focus:border-purple-500"
								id="to-name"
								placeholder="Leah"
							/>
						</div>
						<div className="flex space-x-2">
							<Button
								className="border-2 border-gray-300 focus:border-purple-500"
								variant="outline"
							>
								He/Him
							</Button>
							<Button
								className="border-2 border-gray-300 focus:border-purple-500"
								variant="outline"
							>
								She/Her
							</Button>
							<Button
								className="border-2 border-gray-300 focus:border-purple-500"
								variant="outline"
							>
								They/Them
							</Button>
						</div>
						<div className="space-y-2">
							<Label htmlFor="from-name">From (first name):</Label>
							<Input
								className="border-2 border-gray-300 focus:border-purple-500"
								id="from-name"
								placeholder="Kim"
							/>
						</div>
						<div className="flex space-x-2">
							<Button
								className="border-2 border-gray-300 focus:border-purple-500"
								variant="outline"
							>
								He/Him
							</Button>
							<Button
								className="border-2 border-gray-300 focus:border-purple-500"
								variant="outline"
							>
								She/Her
							</Button>
							<Button
								className="border-2 border-gray-300 focus:border-purple-500"
								variant="outline"
							>
								They/Them
							</Button>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-xl font-medium mb-4">Step 3: Request details</h2>
					<div className="flex space-x-4 mb-4">
						<Button
							className="border-2 border-gray-300 focus:border-purple-500"
							variant="outline"
						>
							Yes, guide me
						</Button>
						<Button
							className="border-2 border-gray-300 focus:border-purple-500"
							variant="outline"
						>
							No, I got this
						</Button>
					</div>
					<Textarea
						className="border-2 border-gray-300 focus:border-purple-500 min-h-[150px]"
						placeholder="Type your request here..."
					/>
				</div>
			</div>
			<div className="flex justify-end mt-8">
				<Button variant="secondary">Cancel</Button>
				<Button className="ml-4">Submit</Button>
			</div>
		</div>
	);
}
