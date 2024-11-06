import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ShowQuizOverModal(props: {
  open: boolean
  score: number
  totalQuestions: number
  onAction: () => void
}) {
  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent className='bg-white p-8 rounded-md shadow-md'>
        <AlertDialogHeader className='text-center mb-6'>
          <AlertDialogTitle className='text-3xl font-bold text-gray-800'>
            Quiz is over
          </AlertDialogTitle>
          <AlertDialogDescription className='text-gray-600 mt-2'>
            Your score is {props.score} out of {props.totalQuestions}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex justify-center'>
          <AlertDialogAction
            onClick={props.onAction}
            className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            Go Back
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
