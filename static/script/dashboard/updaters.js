// Updates the view to show the avaliable files, and the file stats
class ViewUpdater {
    static folder_title = document.getElementById('folder-title')
    static file_stats = document.getElementById('file-stat')
    static file_count_text = document.getElementById('file-stat').getElementsByTagName('h1')[0]
    static folder_count_text = document.getElementById('folder-stat').getElementsByTagName('h1')[0]
    static current_folder_viewer_title = document.getElementById("current-folder-view-title")

    static files_and_folders_list = document.getElementById('files-and-folders-list-content')
    // Icons for file types
    static available_files = ["3g2","3ga","3gp","7z","aa","aac","ac","accdb","accdt","adn","ai","aif","aifc","aiff","ait","amr","ani","apk","app","applescript","asax","asc","ascx","asf","ash","ashx","asmx","asp","aspx","asx","au","aup","avi","axd","aze","bak","bash","bat","bin","blank","bmp","bowerrc","bpg","browser","bz2","c","cab","cad","caf","cal","cd","cer","cfg","cfm","cfml","cgi","class","cmd","codekit","coffee","coffeelintignore","com","compile","conf","config","cpp","cptx","cr2","crdownload","crt","crypt","cs","csh","cson","csproj","css","csv","cue","dat","db","dbf","deb","dgn","dist","diz","dll","dmg","dng","doc","docb","docm","docx","dot","dotm","dotx","download","dpj","ds_store","dtd","dwg","dxf","editorconfig","el","enc","eot","eps","epub","eslintignore","exe","f4v","fax","fb2","fla","flac","flv","folder","gadget","gdp","gem","gif","gitattributes","gitignore","go","gpg","gz","h","handlebars","hbs","heic","hs","hsl","htm","html","ibooks","icns","ico","ics","idx","iff","ifo","image","img","in","indd","inf","ini","iso","j2","jar","java","jpe","jpeg","jpg","js","json","jsp","jsx","key","kf8","kmk","ksh","kup","less","lex","licx","lisp","lit","lnk","lock","log","lua","m","m2v","m3u","m3u8","m4","m4a","m4r","m4v","map","master","mc","md","mdb","mdf","me","mi","mid","midi","mk","mkv","mm","mo","mobi","mod","mov","mp2","mp3","mp4","mpa","mpd","mpe","mpeg","mpg","mpga","mpp","mpt","msi","msu","nef","nes","nfo","nix","npmignore","odb","ods","odt","ogg","ogv","ost","otf","ott","ova","ovf","p12","p7b","pages","part","pcd","pdb","pdf","pem","pfx","pgp","ph","phar","php","pkg","pl","plist","pm","png","po","pom","pot","potx","pps","ppsx","ppt","pptm","pptx","prop","ps","ps1","psd","psp","pst","pub","py","pyc","qt","ra","ram","rar","raw","rb","rdf","resx","retry","rm","rom","rpm","rsa","rss","rtf","ru","rub","sass","scss","sdf","sed","sh","sitemap","skin","sldm","sldx","sln","sol","sql","sqlite","step","stl","svg","swd","swf","swift","sys","tar","tcsh","tex","tfignore","tga","tgz","tif","tiff","tmp","torrent","ts","tsv","ttf","twig","txt","udf","vb","vbproj","vbs","vcd","vcs","vdi","vdx","vmdk","vob","vscodeignore","vsd","vss","vst","vsx","vtx","war","wav","wbk","webinfo","webm","webp","wma","wmf","wmv","woff","woff2","wps","wsf","xaml","xcf","xlm","xls","xlsm","xlsx","xlt","xltm","xltx","xml","xpi","xps","xrb","xsd","xsl","xspf","xz","yaml","yml","z","zip","zsh"]

    static update_text() {
        var new_file_count = String(GLOBALS.all_files["file"].length)
        ViewUpdater.file_count_text.innerHTML = new_file_count

        var new_folder_count = String(GLOBALS.all_files['directory'].length)
        ViewUpdater.folder_count_text.innerHTML = new_folder_count

        var new_current_subfolder_title = GLOBALS.current_viewed_folder.name
        ViewUpdater.current_folder_viewer_title.innerHTML = ViewUpdater.too_long_handler(
            new_current_subfolder_title, 25
        )
    }

    // Shows the folders in the selected directory
    static update_files_list () {
        ViewUpdater.files_and_folders_list.innerHTML = ""
        
        for (var dir of GLOBALS.all_files["directory"]) {
            var new_folder_div = document.createElement("div")
            
            // Give divs that display folders a class
            new_folder_div.setAttribute("class", "folderDiv")
            var folder_name_text = document.createElement('h3')
            folder_name_text.setAttribute("class", "contentRowText folder og")
            folder_name_text.textContent = ViewUpdater.too_long_handler(dir.name, 35);
            folder_name_text.setAttribute("name", dir.name);
            var folder_icon = document.createElement('img')
            folder_icon.src = "/static/imgs/folder-icon.png";
            var delete_btn = document.createElement("button");
            var img_delete_btn = document.createElement("img");
            img_delete_btn.src = "/static/imgs/trash-can.png";
            delete_btn.setAttribute("name", dir.name)
            delete_btn.setAttribute("data-kind", dir.kind);
            delete_btn.setAttribute("class", "delete_btn");

            delete_btn.appendChild(img_delete_btn);
            new_folder_div.appendChild(folder_icon)
            new_folder_div.appendChild(folder_name_text)
            new_folder_div.appendChild(delete_btn);
            new_folder_div.classList.add("files-and-folders-list-content-div")
            ViewUpdater.files_and_folders_list.appendChild(new_folder_div)
        }
    }

    // Shows the files in the selected directory
    static update_folder_list() {
        for (var file of GLOBALS.all_files["file"]) {
            var new_div = document.createElement("div")
            new_div.setAttribute("class", "fileDiv")
            var file_name_text = document.createElement('h3')
            file_name_text.setAttribute("class", "contentRowText file og")
            file_name_text.textContent = ViewUpdater.too_long_handler(file.name, 35);
            file_name_text.setAttribute("name", file.name);
    
            var file_type = file.name.split('.').at(-1)
            var file_icon = document.createElement('img')
            if (ViewUpdater.available_files.includes(file_type.toLowerCase())){
                file_icon.src = `/static/imgs/icons/${file_type.toLowerCase()}.svg`
            } else {
                file_icon.src = "/static/imgs/icons/no_icon.svg"
            }
    
            var delete_btn = document.createElement("button");
            var img_delete_btn = document.createElement("img");
            img_delete_btn.src = "/static/imgs/trash-can.png";
            delete_btn.setAttribute("name", file.name)
            delete_btn.setAttribute("data-kind", file.kind);
            delete_btn.setAttribute("class", "delete_btn");
    
            //file_icon.classList.add('files-and-folders-list-content-img')
            
            delete_btn.appendChild(img_delete_btn);
            new_div.appendChild(file_icon)
            new_div.appendChild(file_name_text)
            new_div.appendChild(delete_btn);
            new_div.classList.add("files-and-folders-list-content-div")
            ViewUpdater.files_and_folders_list.appendChild(new_div)
        }
    }
    
    //Updates what occurs on left or right clicking on a folder/file
    static update_folder_clicks() {
        // Elements
        var folders_divs = document.getElementsByClassName("folderDiv");
        var content_row_names = document.getElementsByClassName("contentRowText");
        var delete_btns = document.getElementsByClassName("delete_btn");

        // On clicking a delete button, open a modal for confirmation of deleting a file/dir
        for (var del_btn of delete_btns) {
            del_btn.onclick = async (e) => {
                await DeleteItems.delete_obj(e.currentTarget);
            }
        }
  
        // On left click, we open the subfolder view of that folder
        for (var folder_div of folders_divs){
            folder_div.onclick = async (e) => {
                // True here denotes we are clicking on a folder in the main folder
                //---------------------------------------v
                await SubfolderViewManager.subfolder_updater(e.currentTarget, true);
            };
              
        }
        // On right click, we rename the file/folder
        for (var row_text of content_row_names) {
            row_text.oncontextmenu = async (e) => {
                // To prevent the popup to appear when right clicked
                e.preventDefault();

                await RenameItems.rename_item(e.currentTarget);
            };
        }
    }

    static update_view() {
        ViewUpdater.update_text()
        ViewUpdater.update_files_list()
        ViewUpdater.update_folder_list()
        ViewUpdater.update_folder_clicks()
    }

    static too_long_handler(str, size) {
        if (str.length > size) {
            var slicedVar = str.slice(0, size)
            return slicedVar.concat("...")
        }
        return str
    }
}
