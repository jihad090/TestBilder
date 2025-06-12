import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Scroll } from "lucide-react"

const incompleteList = [
  {
    id: 1,
    questionType: "Multiple Choice",
    subject: "Mathematics",
    createdAt: "2023-05-10",
    lastUpdate: "2023-05-15"
  },
  {
    id: 2,
    questionType: "True/False",
    subject: "Science",
    createdAt: "2023-06-05",
    lastUpdate: "2023-06-20"
  },
  {
    id: 3,
    questionType: "Short Answer",
    subject: "History",
    createdAt: "2023-04-01",
    lastUpdate: "2023-04-10"
  },
  {
    id: 4,
    questionType: "Essay",
    subject: "English Literature",
    createdAt: "2023-06-25",
    lastUpdate: "2023-07-05"
  },
  {
    id: 5,
    questionType: "Fill in the Blank",
    subject: "Geography",
    createdAt: "2023-03-10",
    lastUpdate: "2023-03-18"
  },
  {
    id: 6,
    questionType: "Matching",
    subject: "Biology",
    createdAt: "2023-08-12",
    lastUpdate: "2023-09-02"
  },
  {
    id: 7,
    questionType: "Diagram Based",
    subject: "Physics",
    createdAt: "2023-07-15",
    lastUpdate: "2023-08-01"
  },
  {
    id: 1,
    questionType: "Multiple Choice",
    subject: "Mathematics",
    createdAt: "2023-05-10",
    lastUpdate: "2023-05-15"
  },
  {
    id: 2,
    questionType: "True/False",
    subject: "Science",
    createdAt: "2023-06-05",
    lastUpdate: "2023-06-20"
  },
  {
    id: 3,
    questionType: "Short Answer",
    subject: "History",
    createdAt: "2023-04-01",
    lastUpdate: "2023-04-10"
  },
  {
    id: 4,
    questionType: "Essay",
    subject: "English Literature",
    createdAt: "2023-06-25",
    lastUpdate: "2023-07-05"
  },
  {
    id: 5,
    questionType: "Fill in the Blank",
    subject: "Geography",
    createdAt: "2023-03-10",
    lastUpdate: "2023-03-18"
  },
  {
    id: 6,
    questionType: "Matching",
    subject: "Biology",
    createdAt: "2023-08-12",
    lastUpdate: "2023-09-02"
  },
  {
    id: 7,
    questionType: "Diagram Based",
    subject: "Physics",
    createdAt: "2023-07-15",
    lastUpdate: "2023-08-01"
  },
  {
    id: 1,
    questionType: "Multiple Choice",
    subject: "Mathematics",
    createdAt: "2023-05-10",
    lastUpdate: "2023-05-15"
  },
  {
    id: 2,
    questionType: "True/False",
    subject: "Science",
    createdAt: "2023-06-05",
    lastUpdate: "2023-06-20"
  },
  {
    id: 3,
    questionType: "Short Answer",
    subject: "History",
    createdAt: "2023-04-01",
    lastUpdate: "2023-04-10"
  },
  {
    id: 4,
    questionType: "Essay",
    subject: "English Literature",
    createdAt: "2023-06-25",
    lastUpdate: "2023-07-05"
  },
  {
    id: 5,
    questionType: "Fill in the Blank",
    subject: "Geography",
    createdAt: "2023-03-10",
    lastUpdate: "2023-03-18"
  },
  {
    id: 6,
    questionType: "Matching",
    subject: "Biology",
    createdAt: "2023-08-12",
    lastUpdate: "2023-09-02"
  },
  {
    id: 7,
    questionType: "Diagram Based",
    subject: "Physics",
    createdAt: "2023-07-15",
    lastUpdate: "2023-08-01"
  },
  {
    id: 1,
    questionType: "Multiple Choice",
    subject: "Mathematics",
    createdAt: "2023-05-10",
    lastUpdate: "2023-05-15"
  },
  {
    id: 2,
    questionType: "True/False",
    subject: "Science",
    createdAt: "2023-06-05",
    lastUpdate: "2023-06-20"
  },
  {
    id: 3,
    questionType: "Short Answer",
    subject: "History",
    createdAt: "2023-04-01",
    lastUpdate: "2023-04-10"
  },
  {
    id: 4,
    questionType: "Essay",
    subject: "English Literature",
    createdAt: "2023-06-25",
    lastUpdate: "2023-07-05"
  },
  {
    id: 5,
    questionType: "Fill in the Blank",
    subject: "Geography",
    createdAt: "2023-03-10",
    lastUpdate: "2023-03-18"
  },
  {
    id: 6,
    questionType: "Matching",
    subject: "Biology",
    createdAt: "2023-08-12",
    lastUpdate: "2023-09-02"
  },
  {
    id: 7,
    questionType: "Diagram Based",
    subject: "Physics",
    createdAt: "2023-07-15",
    lastUpdate: "2023-08-01"
  }
]

export default function TableDemo() {
  return (
    <div className="">
      <p className=" text-3xl w-full text-center bg-white">Incomplete Questions</p>
      <ScrollArea className="h-[90vh] " >
        <Table className="relative">
          <TableCaption>A list of your Incomplete Questions.</TableCaption>
          <TableHeader className=" sticky bg-blue-100 ">
            <TableRow >
              <TableHead >SL No</TableHead>
              <TableHead >Question Type</TableHead>
              <TableHead >Subject</TableHead>
              <TableHead >Created At</TableHead>
              <TableHead >Last Updated</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incompleteList.map((item, idx) => (
              <TableRow className="bg-red-100 border-4" key={idx + 1}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.questionType}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.lastUpdate}</TableCell>
                <TableCell className="text-right">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="ml-2 text-red-600 hover:underline">Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className=" text-center" colSpan={6}>Total Questions: {incompleteList.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>


    </div>

  )
}