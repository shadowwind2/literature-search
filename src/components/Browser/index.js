import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Notes from './Notes'
import './index.scss'
export default function Browser(props) {
  const [search, setSearch] = useSearchParams()
  return (
    <div className='browser'>
      <iframe id="PDFviewer"
        title="PDF viewer"
        src={'https://www.izeqi.top/pdfjs/web/viewer.html?file=/web/pdf/' + search.get('name') + '.pdf'}>
      </iframe>
      <Notes/>

    </div>
  )
}
