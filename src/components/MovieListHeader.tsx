interface HeaderProps {
  headerText: string;
  mainHeader?: boolean
}

const MovieListHeader = ({ headerText, mainHeader = false }: HeaderProps) => {
  return (
    <div className="col text-center text-sm-start">
      {mainHeader ?
        <h1 className="mb-2 mb-sm-0">{headerText}</h1>
        :
        <h3 className="mb-2 mb-sm-0">{headerText}</h3>
      }
    </div>
  )
}

export default MovieListHeader;