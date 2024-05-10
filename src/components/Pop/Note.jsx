import {IoMdClose} from 'react-icons/io'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./pop.css"


const customStyle = {
    "maxHeight":"500px",
    "overflow":"scroll"
  };
const NotePop=({notes,closeFunc})=>{
    return (
        <div class="popup-overlay" id="popup">
            <div class="popup-content">
                <div className="comment-head">
                    <h3>Create Note</h3>
                    <IoMdClose class="close-btn" onClick={closeFunc} size={24}/>
                </div>
                <SyntaxHighlighter contentEditable 
                customStyle={customStyle}
                    onBlur={(e) => setCode(e.target.textContent)} 
                    language="javascript" style={vscDarkPlus}>
                        {notes}
                    </SyntaxHighlighter>
            </div>
        </div>
    );
}
export default NotePop;