const button = document.createElement('button');
button.innerText = 'click me';
button.onclick = () => {
    System.import('./image_viewer').then(module => {
        module.default()
    }); //System is a global variable in es2015. This is an async call. Webpack scans entire project files for System.import
};

document.body.appendChild(button);