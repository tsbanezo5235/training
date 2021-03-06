import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SPCSS from './single-page.css'
import 'antd/dist/antd.css';
import { InputNumber, Button, Space, AutoComplete } from 'antd';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const SinglePage = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess =({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage = () => {
    changePage(-1);
  }

  const nextPage = () => {
    changePage(1);
  }

  const { pdf } = props;

  return (
    <React.Fragment>
      <div className={SPCSS}>
        <Space>
          <InputNumber min={1} max={10} value={pageNumber} onChange={setPageNumber} />
          {/* <Button
            type="primary"
            onClick={() => {
              setPageNumber(99);
            }}
          >
            跳轉
          </Button> */}
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
        </Space>
        <div>
          <Document
            file={pdf}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
            
          >
            <Page pageNumber={pageNumber}></Page>
          </Document>
        </div>
        
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            上一頁
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            下一頁
          </button>
        </div>
      </div>
      
    </React.Fragment>
  )
}

export default SinglePage;