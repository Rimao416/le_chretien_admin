import {Document, Page} from '@react-pdf/renderer'
import { useState } from 'react'
function PdfViewer({document}) {
    const [numPages,setNumPages]=useState(null)
    const [pageNumber,setPageNumber]=useState(1)
    function onDocumentSuccess({numPages}){
        setNumPages(numPages)
    }
  return (
    <div>
        <Document file={document} onLoadSuccess={onDocumentSuccess}>
            <Page pageNumber={pageNumber} />
        </Document>
    </div>
  )
}

export default PdfViewer
