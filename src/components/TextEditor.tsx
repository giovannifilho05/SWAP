import Quill from 'quill'
import { useState, useCallback } from 'react'

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
]

export default function TextEditor({ }) {
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  //   if (socket == null || quill == null) return

  //   const handler = (delta, oldDelta, source) => {
  //     if (source !== "user") return
  //     socket.emit("send-changes", delta)
  //   }
  //   quill.on("text-change", handler)

  //   return () => {
  //     quill.off("text-change", handler)
  //   }

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return

    wrapper.innerHTML = ''
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.disable()
    q.setText('Loading...')
    setQuill(q)
  }, [])
  return <div className="container" ref={wrapperRef}></div>
}