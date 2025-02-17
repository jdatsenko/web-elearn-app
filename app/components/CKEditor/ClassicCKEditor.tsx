"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "ckeditor5/ckeditor5.css";
import { Editor } from "@ckeditor/ckeditor5-core";
import { UploadAdapter, FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository";


function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const file = await loader.file;
            if (file === null) {
              return;
            }
            const reader = new FileReader();
  
            reader.readAsDataURL(file);
            reader.onload = () => {
              resolve({ default: reader.result });
            };
            reader.onerror = (error) => reject(error);
          } catch (error) {
            reject(error);
          }
        });
      },
      abort: () => {}
    };
  }
  
  function uploadPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

function ClassicCKEditor({
  data,
  onChange,
}: {
  data: string;
  onChange: (event: any, editor: ClassicEditor) => void;
}) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      config={ {
        licenseKey: 'GPL', 
        extraPlugins: [uploadPlugin],
        }}
      onReady={(editor) => {
        console.log("ClassicCKEditor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(event, editor);
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
}

export default ClassicCKEditor;