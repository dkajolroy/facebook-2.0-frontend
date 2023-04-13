import React from 'react'
import { CgClose } from 'react-icons/cg';
import Modal from 'react-modal';
import gifData from '../../../Helpers/gifData';
import { useSelector } from 'react-redux';
import Scrollbars from 'rc-scrollbars';

function GifModal({ gifModal, setGifModal, setGif }) {
    const { value } = useSelector(x => x.theme)

    const handleGif = (gif) => {
        setGif(gif.image)
        setGifModal(false)
    }

    return (
        <Modal
            isOpen={gifModal}
            contentLabel="SignUp Modal"
            ariaHideApp={false}
            className={`create_post_modal_open ${value}`}
            onRequestClose={() => setGifModal()}
            style={{
                overlay: {
                    position: 'fixed',
                    left: "0",
                    display: "flex",
                    alignItems: "center",
                    zIndex: "300",
                    top: `0`,
                    justifyContent: "center",
                    background: `${value == "dark" ? "rgb(10 10 10 / 68%)" : "var(--bg-transparent1)"}`,
                },
                content: {
                    border: "none",
                    width: "500px",
                    transition: ".2s",
                    zIndex: "200",
                    height: `450px`,
                    padding: '0'
                }
            }}
        >
            <div className="all_photos_items_cover">
                <div className="animate__animated animate__fadeInUp">
                    <div className="heading_top_x_bars">
                        <h5>Choose GIF</h5>
                        <span onClick={() => setGifModal(false)}><CgClose /></span>
                        <div className="divider"></div>
                    </div>

                    <Scrollbars style={{ width: "100%", height: "390px" }}>
                        <div className="images_all_gif_anim">
                            {
                                gifData.map((x, i) => (
                                    <div key={i} onClick={() => handleGif(x)} className="item_of_gif_anim_sel">
                                        <img src={x.image} alt="gif" />
                                    </div>
                                ))
                            }
                        </div>
                    </Scrollbars>
                </div>
            </div>

        </Modal>
    )
}

export default GifModal