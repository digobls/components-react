import React from 'react';
import TableExample from './TableExample';
import SkeletonLoadingExample from './SkeletonLoadingExample';
import DefaultButtonLoadingExample from './DefaultButtonLoadingExample';

function Components() {
    return (
        <div className="col-12 container-components">
            <div className="row">
                <div className="col-12">
                    <h1>Exemplos de componentes.</h1>
                </div>

                <div className="col-12 offset-bottom-20">
                    <TableExample></TableExample>

                    <DefaultButtonLoadingExample></DefaultButtonLoadingExample>

                    <SkeletonLoadingExample></SkeletonLoadingExample>
                </div>
            </div>
        </div>
    );
}
export default Components;