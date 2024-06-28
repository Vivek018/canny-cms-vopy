import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	PDFViewer,
  
} from '@react-pdf/renderer'
import { useIsDocument } from '@/utils/clients/is-document'
import { cn } from '@/utils/misx'

// Create styles
const styles = () =>
	StyleSheet.create({
		page: {
			backgroundColor: '#ffffff',
			color: 'black',
			padding: 40,
			fontFamily: 'Times-Roman',
			fontSize: 12,
			lineHeight: 1.6,
		},
		header: {
			marginBottom: 30,
		},
		companyName: {
			fontSize: 16,
			fontWeight: 'bold',
			marginBottom: 5,
		},
		companyAddress: {
			fontSize: 10,
			marginBottom: 5,
		},
		section: {
			marginBottom: 20,
		},
		signature: {
			marginTop: 40,
			fontSize: 12,
		},
		footer: {
			marginTop: 30,
			borderTopWidth: 1,
			borderTopColor: '#000000',
			borderTopStyle: 'solid',
			paddingTop: 10,
			fontSize: 10,
			textAlign: 'center',
		},
	})

const LetterContent = ({ type, data }: { type: any; data: any }) => {
	switch (type) {
		case 'offer':
			return (
				<View>
					<Text style={styles().section}>Dear {data.name},</Text>
					<Text style={styles().section}>
						We are delighted to extend to you this offer of employment for the
						position of {data.position} at [Company Name]. We are confident that
						your skills and experience will be an ideal fit for our team.
					</Text>
					<Text style={styles().section}>
						Your start date will be {data.startDate}.
					</Text>
					<Text style={styles().section}>
						Your annual salary will be {data.salary}.
					</Text>
					<Text style={styles().section}>
						Please sign and return this letter by {data.responseDate} to confirm
						your acceptance of this offer.
					</Text>
					<Text style={styles().signature}>Sincerely,</Text>
					<Text style={styles().signature}>[Your Name]</Text>
					<Text style={styles().signature}>[Your Position]</Text>
					<Text style={styles().signature}>[Company Name]</Text>
				</View>
			)
		case 'notice':
			return (
				<View>
					<Text style={styles().section}>Dear {data.name},</Text>
					<Text style={styles().section}>
						This letter serves as formal notice of the termination of your
						employment with [Company Name], effective {data.endDate}.
					</Text>
					<Text style={styles().section}>
						We appreciate the contributions you have made during your tenure
						with us and wish you the best in your future endeavors.
					</Text>
					<Text style={styles().signature}>Sincerely,</Text>
					<Text style={styles().signature}>[Your Name]</Text>
					<Text style={styles().signature}>[Your Position]</Text>
					<Text style={styles().signature}>[Company Name]</Text>
				</View>
			)
		case 'experience':
			return (
				<View>
					<Text style={styles().section}>To Whom It May Concern,</Text>
					<Text style={styles().section}>
						This is to certify that {data.name} was employed with [Company Name]
						as a {data.position} from {data.startDate} to {data.endDate}.
					</Text>
					<Text style={styles().section}>
						During their tenure, {data.name} was responsible for{' '}
						{data.responsibilities} and demonstrated excellent performance in
						their role.
					</Text>
					<Text style={styles().section}>
						We wish them continued success in their future career endeavors.
					</Text>
					<Text style={styles().signature}>Sincerely,</Text>
					<Text style={styles().signature}>[Your Name]</Text>
					<Text style={styles().signature}>[Your Position]</Text>
					<Text style={styles().signature}>[Company Name]</Text>
				</View>
			)
		default:
			return <Text>Invalid letter type</Text>
	}
}

export const PDF = ({ type, data }: { type: any; data: any }) => {
	const { isDocument } = useIsDocument()

	return (
		<PDFViewer 
			className={cn('hidden', isDocument && 'flex')}
			style={{ width: innerWidth - 320, height: innerHeight - 80 }}
		>
			<Document
				title={`${type.charAt(0).toUpperCase() + type.slice(1)}`}
			>
				<Page size="A4" style={styles().page}>
					<View style={styles().header}>
						<Text style={styles().companyName}>[Company Name]</Text>
						<Text style={styles().companyAddress}>
							123 Business Road, Business City, BC 12345
						</Text>
						<Text style={styles().companyAddress}>
							Phone: (123) 456-7890 | Email: info@company.com
						</Text>
					</View>
					<LetterContent type={type} data={data} />
					<View style={styles().footer}>
						<Text>
							© {new Date().getFullYear()} [Company Name]. All rights reserved.
						</Text>
					</View>
				</Page>
			</Document>
		</PDFViewer>
	)
}
