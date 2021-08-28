
const darkModeCheckBox = document.getElementById("darkMode");
const datosPrincipales = document.querySelector(".datosPrincipales")
if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    darkModeCheckBox.checked = true;
  }
  darkModeCheckBox.addEventListener('click', e=>{
  
    if(darkModeCheckBox.checked){
      document.documentElement.style.setProperty('--fontColors','#eaebf1')
      document.documentElement.style.setProperty('--fontColorButtons','#eaebf1')
      document.documentElement.style.setProperty('--googleButtonHover','rgb(134, 126, 126)')
      document.documentElement.style.setProperty('--googleFontColor','#eaebf1')
      document.documentElement.style.setProperty('--googleButtonBackground','rgb(59, 57, 57)')
      document.documentElement.style.setProperty('--sectionBackground','#121212')
      document.documentElement.style.setProperty('--navBarBackground','rgb(41, 41, 41)')
      document.documentElement.style.setProperty('--searchBarColor','rgb(59, 57, 57)')
      document.documentElement.style.setProperty('--inputBackground','#383737')

      document.documentElement.style.setProperty('--backgroundColor','#121212')
      document.documentElement.style.setProperty('--backgroundSections','#222222')
      document.documentElement.style.setProperty('--whiteButtonsFontColor','#eaebf1')
      document.documentElement.style.setProperty('--whiteButtonsBackground','rgb(59, 57, 57)')
      document.documentElement.style.setProperty('--footerBackground','#222222')
      document.documentElement.style.setProperty('--footerFontColor','#eaebf1')

      datosPrincipales.style.background = "linear-gradient(315deg, #000000 0%, #414141 74%)";

    }else{
      document.documentElement.style.setProperty('--fontColors','#2e2e2e')
      document.documentElement.style.setProperty('--fontColorButtons','#eaebf1')
      document.documentElement.style.setProperty('--googleButtonHover','rgb(134, 126, 126)')
      document.documentElement.style.setProperty('--googleFontColor','#1d1d1d')
      document.documentElement.style.setProperty('--googleButtonBackground','rgb(233, 231, 231)')
      document.documentElement.style.setProperty('--sectionBackground','#ffffff')
      document.documentElement.style.setProperty('--navBarBackground','rgb(255, 255, 255)')
      document.documentElement.style.setProperty('--searchBarColor','rgb(255, 255, 255)')
      document.documentElement.style.setProperty('--inputBackground','rgb(255, 255, 255)')
  
      document.documentElement.style.setProperty('--backgroundColor','#e2e1e0')
      document.documentElement.style.setProperty('--backgroundSections','white')
      document.documentElement.style.setProperty('--whiteButtonsFontColor','#2e2e2e')
      document.documentElement.style.setProperty('--whiteButtonsBackground','white')
      document.documentElement.style.setProperty('--footerBackground','#2d2f8e')
      document.documentElement.style.setProperty('--footerFontColor','#eaebf1')

      datosPrincipales.style.background = "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)";

    }
  
    })