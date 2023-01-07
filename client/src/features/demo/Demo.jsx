import React from "react";
import Page from "../../components/page/Page";
import PageContent from "../../components/page-content/PageContent";
import Divider from "../../components/sidebar/NavDivider";

const Demo = () => {
	return (
		<>
			<Page>
				<PageContent>
					<div className="d-flex flex-row justify-content-between">
						First Row Element
						<p>This is my first sub element</p>
						<p>THis is my second sub element</p>
					</div>
					<div>
						Second Row element
						<p>THis is my first sub element</p>
						<p>THis is my second sub element</p>
					</div>
				</PageContent>
			</Page>
		</>
	);
};

export default Demo;
