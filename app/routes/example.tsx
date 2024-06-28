import { Modal } from '@/components/modal'
import { PDF } from '@/components/pdf-example'

const letterData = {
	name: 'John Doe',
	position: 'Software Engineer',
	startDate: '2024-06-15',
	salary: '$100,000',
	endDate: '2025-06-15',
	responsibilities: 'Developing and maintaining web applications',
}

export default function Example() {
	return (
		<Modal
			inMiddle
			className="rounded-md bg-transparent px-0 py-0"
			iconClassName="sr-only"
		>
			<PDF type="notice" data={letterData} />
		</Modal>
	)
}
