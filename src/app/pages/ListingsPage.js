import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Masonry } from "masonic";

import Card from "../components/Card";
import listingsApi from "../api/listings";
import settings from "../config/settings";
import useApi from "../hooks/useApi";
import Spinner from "../components/layout/Spinner";
import Alert from "../components/Alert";

const ListingsPage = () => {
	const {
		data: listings,
		error,
		errorMessage,
		loading,
		request: getListings,
	} = useApi(listingsApi.getListings);

	const { pageNumber = 1 } = useParams();

	const [meta, setMeta] = useState(null);

	const _getListings = async () => {
		const res = await getListings(pageNumber);
		setMeta(res.data.meta);
	};

	useEffect(() => {
		_getListings();
	}, [pageNumber]);

	return (
		<>
			{loading && <Spinner loading={loading} />}
			{error && <Alert message={errorMessage} />}
			{listings && meta && (
				<div className="listings">
					<h1 className="listings__header">Discover our latest listings!</h1>
					{meta.last_page !== 1 && (
						<ul className="listings__pagination">
							{meta.current_page !== 1 && (
								<li className="listings__paginationItem">
									<Link
										to={"/feed/page/" + (meta.current_page - 1)}
										className="listings__paginationLink"
									>
										&laquo; Prev
									</Link>
								</li>
							)}

							{[...Array(meta.last_page).keys()].map(i => {
								return (
									<li
										className={`listings__paginationItem ${
											meta.current_page === i + 1 ? "active" : ""
										}`}
										key={i}
									>
										<Link
											to={"/feed/page/" + (i + 1)}
											className="listings__paginationLink"
										>
											{i + 1}
										</Link>
									</li>
								);
							})}
							{meta.last_page !== meta.current_page && (
								<li className="listings__paginationItem">
									<Link
										to={"/feed/page/" + (meta.current_page + 1)}
										className="listings__paginationLink"
									>
										Next &raquo;
									</Link>
								</li>
							)}
						</ul>
					)}
					<div className="listings__feedWrapper">
						<Masonry
							key={pageNumber}
							items={listings}
							className="listings__feed"
							columnWidth={450}
							columnGutter={20}
							render={({ i, data: listing, width }) => (
								<Link
									to={"/listings/" + listing.id}
									key={listing.id}
									className="listings__feedItem u-mb-1"
								>
									<Card
										image={settings.baseUrl + listing.photos[0].url}
										title={listing.title}
										subtitle={listing.price + "$"}
										details={
											listing.description
												? listing.description.substr(0, 80) + "..."
												: null
										}
									/>
								</Link>
							)}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default ListingsPage;
