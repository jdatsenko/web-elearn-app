"use client";

import { Button } from '@/components/ui/button';
import EditorJS from '@editorjs/editorjs';
import SimpleImage from "@editorjs/simple-image";
import { useRef } from 'react';

export default function Editor() {
    const ejInstance = useRef<EditorJS>();
    const editor = new EditorJS({
        holder: 'editorjs',
        onReady: () => {
            console.log('Editor.js is ready to work!');
            ejInstance.current = editor;
        },
        tools: {
            image: SimpleImage,
        }
    });
    return (
        <><div id='editorjs'></div>
            <Button onClick={() => {
                editor.save().then((outputData) => {
                    console.log('Article data: ', outputData);
                }).catch((error) => {
                    console.log('Saving failed: ', error);
                });
            }
            }>Save</Button>
        </>

    )
}