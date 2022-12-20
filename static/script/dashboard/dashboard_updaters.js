
const folder_title = document.getElementById('folder-title')
const file_stats = document.getElementById('file-stat')
const file_count_text = document.getElementById('file-stat').getElementsByTagName('h1')[0]
const folder_count_text = document.getElementById('folder-stat').getElementsByTagName('h1')[0]
const current_folder_viewer_title = document.getElementById("current-folder-view-title")
function update_text() {
    const element_list = [folder_title, file_count_text, folder_count_text, current_folder_viewer_title];
    const val_list = [directory_handles.name, String(all_files["file"].length), String(all_files['directory'].length), directory_handles.name];

    for (element of element_list) {
        indexOfElement = element_list.indexOf(element);
        let newVal = val_list[indexOfElement]

        if (newVal.length > 25) {
            const slicedVar = newVal.slice(0, 25)
            newVal = slicedVar.concat("...")
        } 

        element.innerHTML = newVal;
    }
}

const files_and_folders_list = document.getElementById('files-and-folders-list-content')
// Icons for file types
const available_files = ["3g2","3ga","3gp","7z","aa","aac","ac","accdb","accdt","adn","ai","aif","aifc","aiff","ait","amr","ani","apk","app","applescript","asax","asc","ascx","asf","ash","ashx","asmx","asp","aspx","asx","au","aup","avi","axd","aze","bak","bash","bat","bin","blank","bmp","bowerrc","bpg","browser","bz2","c","cab","cad","caf","cal","cd","cer","cfg","cfm","cfml","cgi","class","cmd","codekit","coffee","coffeelintignore","com","compile","conf","config","cpp","cptx","cr2","crdownload","crt","crypt","cs","csh","cson","csproj","css","csv","cue","dat","db","dbf","deb","dgn","dist","diz","dll","dmg","dng","doc","docb","docm","docx","dot","dotm","dotx","download","dpj","ds_store","dtd","dwg","dxf","editorconfig","el","enc","eot","eps","epub","eslintignore","exe","f4v","fax","fb2","fla","flac","flv","folder","gadget","gdp","gem","gif","gitattributes","gitignore","go","gpg","gz","h","handlebars","hbs","heic","hs","hsl","htm","html","ibooks","icns","ico","ics","idx","iff","ifo","image","img","in","indd","inf","ini","iso","j2","jar","java","jpe","jpeg","jpg","js","json","jsp","jsx","key","kf8","kmk","ksh","kup","less","lex","licx","lisp","lit","lnk","lock","log","lua","m","m2v","m3u","m3u8","m4","m4a","m4r","m4v","map","master","mc","md","mdb","mdf","me","mi","mid","midi","mk","mkv","mm","mo","mobi","mod","mov","mp2","mp3","mp4","mpa","mpd","mpe","mpeg","mpg","mpga","mpp","mpt","msi","msu","nef","nes","nfo","nix","npmignore","odb","ods","odt","ogg","ogv","ost","otf","ott","ova","ovf","p12","p7b","pages","part","pcd","pdb","pdf","pem","pfx","pgp","ph","phar","php","pkg","pl","plist","pm","png","po","pom","pot","potx","pps","ppsx","ppt","pptm","pptx","prop","ps","ps1","psd","psp","pst","pub","py","pyc","qt","ra","ram","rar","raw","rb","rdf","resx","retry","rm","rom","rpm","rsa","rss","rtf","ru","rub","sass","scss","sdf","sed","sh","sitemap","skin","sldm","sldx","sln","sol","sql","sqlite","step","stl","svg","swd","swf","swift","sys","tar","tcsh","tex","tfignore","tga","tgz","tif","tiff","tmp","torrent","ts","tsv","ttf","twig","txt","udf","vb","vbproj","vbs","vcd","vcs","vdi","vdx","vmdk","vob","vscodeignore","vsd","vss","vst","vsx","vtx","war","wav","wbk","webinfo","webm","webp","wma","wmf","wmv","woff","woff2","wps","wsf","xaml","xcf","xlm","xls","xlsm","xlsx","xlt","xltm","xltx","xml","xpi","xps","xrb","xsd","xsl","xspf","xz","yaml","yml","z","zip","zsh"]
function update_files_list() {
    files_and_folders_list.innerHTML = ""

    for (dir of all_files["directory"]) {
        var new_folder_div = document.createElement("div")
        
        // Give divs that display folders a class
        new_folder_div.setAttribute("class", "folderDiv")
        var folder_name_text = document.createElement('h3')
        folder_name_text.textContent = dir.name
        var folder_icon = document.createElement('img')
        folder_icon.src = "/static/imgs/folder-icon.png";
        
        new_folder_div.appendChild(folder_icon)
        new_folder_div.appendChild(folder_name_text)
        new_folder_div.classList.add("files-and-folders-list-content-div")
        files_and_folders_list.appendChild(new_folder_div)
    }

    for (file of all_files["file"]) {
        var new_div = document.createElement("div")
        var file_name_text = document.createElement('h3')
        file_name_text.textContent = file.name

        var file_type = file.name.split('.').at(-1)
        var file_icon = document.createElement('img')
        if (available_files.includes(file_type.toLowerCase())){
            file_icon.src = `/static/imgs/icons/${file_type.toLowerCase()}.svg`
        } else {
            file_icon.src = "/static/imgs/icons/no_icon.svg"
        }

        //file_icon.classList.add('files-and-folders-list-content-img')
        
        new_div.appendChild(file_icon)
        new_div.appendChild(file_name_text)
        new_div.classList.add("files-and-folders-list-content-div")
        files_and_folders_list.appendChild(new_div)
    }
}

function update_view() {
    update_text()
    update_files_list()
    // In another file
    update_folder_clicks()
}