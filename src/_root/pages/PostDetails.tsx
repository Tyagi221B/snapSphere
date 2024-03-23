import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { getRelativeTime } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
	const { id } = useParams();
	const { user } = useUserContext();

	const { data: post, isPending } = useGetPostById(id || "");
	// console.log(post)

	const handleDeletePost = () => {
		alert(
			"Sorry you can not delete the post right now soon you will be able to , we are working on this funcitonality"
		);
		alert("But Hey! you can edit if you want ");
	};

	return (
		<div className="post_details-container">
			{isPending ? (
				<Loader />
			) : (
				<div className="post_details-card">
					<img src={post?.imageUrl} alt="post" className="post_details-img" />
					<div className="post_details-info">
						<div className="flex-between w-full">
							<Link
								to={`/profile/${post?.creator.$id}`}
								className="flex items-center gap-3"
							>
								<img
									src={
										post?.creator?.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt="creator"
									className="rounded-full w-8 h-8 lg:h-12 lg:w-12"
								/>
								<div className="flex flex-col">
									<p className="base-medium lg:body-bold text-light-1">
										{post?.creator.name}
									</p>
									<div className="flex-center gap-2 text-light-3">
										<p className="subtle-semibold lg:small-regular">
											{post?.$createdAt && getRelativeTime(post.$createdAt)}
										</p>
										-
										<p className="subtel-semibold lg:small-regular">
											{post?.location}
										</p>
									</div>
								</div>
							</Link>
							<div className="flex-center lg:gap-4">
								<Link
									to={`/update-post/${post?.$id}`}
									className={`${
										user.id !== post?.creator.$id && "hidden"
									} hover:scale-105`}
								>
									<img
										src="/assets/icons/edit.svg"
										alt="edit"
										height={24}
										width={24}
									/>
								</Link>
								<Button
									onClick={handleDeletePost}
									variant="ghost"
									className={`ghost_details-delete_btn ${
										user.id !== post?.creator.$id && "hidden"
									} hover:scale-105`}
								>
									<img
										src="/assets/icons/delete.svg"
										alt="delete"
										height={24}
										width={24}
									/>
								</Button>
							</div>
						</div>
						<hr className="border w-full border-dark-4/80" />
						<div className="small-medium flex flex-col flex-1 w-full lg:base-regular">
							<p>{post?.caption}</p>
							<ul className="flex gap-1 mt-2">
								{post?.tags.map((tag: string) => (
									<li key={tag} className="text-light-3">
										{tag}
									</li>
								))}
							</ul>
						</div>
						<div className="w-full">
							<PostStats post={post} userId={user.id} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostDetails;
