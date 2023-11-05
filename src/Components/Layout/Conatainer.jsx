import PropTypes from 'prop-types'
const Conatainer = ({children}) => {
    return (
        <div className=" w-full max-w-[1200px] mx-auto">

            {children}
            
        </div>
    );
};

Conatainer.propTypes={
    children: PropTypes.node
}

export default Conatainer;