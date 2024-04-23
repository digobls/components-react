import React from 'react';
import SkeletonLoading from '../../components/skeletonLoading/SkeletonLoading';

function SkeletonLoadingExample() {
    return (
        <div className="col-12 box-rounded-white offset-top-20">
            <div className="row">
                <div className="col-12">
                    <div className="container-title-description">
                        <h4>Skeleton loading</h4>
                        <p>Configurações aplicadas dentro do skeleton loading</p>
                    </div>
                </div>

                <div className="col-12 offset-top-20">
                    <label className="additional-info">Custom</label>
                    <SkeletonLoading
                        type={'normal'}
                        width={'300px'}
                        height={'40px'}
                        margin={'10px 20px 0 0'}
                        display={'inline-block'}/>
                    <SkeletonLoading
                        type={'normal'}
                        width={'300px'}
                        height={'40px'}
                        margin={'10px 20px 0 0'}
                        display={'inline-block'}/>
                </div>
                <div className="col-12 offset-top-20">
                    <label className="additional-info">Table</label>
                    <SkeletonLoading
                        type={'table'}
                        totalRepeat={10}/>
                </div>
            </div>
        </div>
    );
}

export default SkeletonLoadingExample;
