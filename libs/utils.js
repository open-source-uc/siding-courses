module.exports = {
  baseUrl: 'https://intrawww.ing.puc.cl',
  catalogueIndexUrl: 'https://intrawww.ing.puc.cl/siding/dirdes/ingcursos/cursos/index.phtml?acc_inicio=catalogo',
  yearsSelector: '#oSelPerAnno option',
  departmentSelector: '.ColorFondoSubHeader2',
  courseUrlSelector: initials => `.tr_${initials} a[href*="accion_curso=avisos"]`,
  cleanText: text => text.replace(/\r|\t|\n/g, '').replace('<br>', '').trim()
};
