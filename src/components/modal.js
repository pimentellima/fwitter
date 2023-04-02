const overlayStyle= {
    'background': 'rgba(255,255,255,0.1)',
    'display': 'flex',
    'justifyItems': 'center',
    'alignItems': 'center',
};

const Modal = ({ children, onOpen, onClose, open }) => {

    return (
        <Popup
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            {...{overlayStyle}}
            >   
            {children}
        </Popup>
    )

}

export default Modal;