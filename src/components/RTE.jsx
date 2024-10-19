import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full text-left'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='do3udy2iulaedhby7ionlpimbl9d53nih7uqudcpeycvfeb9'
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "code", "help", "wordcount",
                "anchor", "emoticons", "visualchars", "codesample", "textcolor"
              ],
              toolbar: [
                "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify",
                "bullist numlist outdent indent | removeformat | help | image media link codesample emoticons"
              ],
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              textcolor_rows: "4",
              textcolor_cols: "5"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  )
}