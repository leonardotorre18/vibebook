interface PropTypes {
  user: any
}

export default ({ user }: PropTypes) => {

  return (
    <>Usuario logueado {user.email}</>
  );
}
