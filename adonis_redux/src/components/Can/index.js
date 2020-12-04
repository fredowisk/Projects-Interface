import { connect } from 'react-redux';

function checkAuth({ roles, permissions }, checkRole, checkPermission) {
  // se o checkRole estiver vazio e não tiver a role incluida nele...
  if (checkRole && !roles.includes(checkRole)) {
    return false;
  }
  if (checkPermission && !permissions.includes(checkPermission)) {
    return false;
  }

  return true;
}

// se a função checkAuth retornar true, retorne o conteudo "children"
const Can = ({
  children, auth, checkRole, checkPermission,
}) => (typeof children === 'function'
  ? children(checkAuth(auth, checkRole, checkPermission))
  : checkAuth(auth, checkRole, checkPermission) && children);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Can);
