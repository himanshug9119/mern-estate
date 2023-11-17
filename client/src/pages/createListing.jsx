export default function createListing() {
  return (
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create Listing
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border
          p-3 rounded-lg"
            id="title"
          />
          <input
            type="text"
            placeholder="Description"
            className="border
          p-3 rounded-lg"
            id="description"
          />
          <input
            type="text"
            placeholder="Location"
            className="border
          p-3 rounded-lg"
            id="location"
          />
          <input
            type="number"
            placeholder="Price"
            className="border
                    p-3 rounded-lg"
            id="price"
          />
          <input type="file" accept="image/*" />
          <button
            className="bg-green-700 text-white rounded-lg 
                    p-3 uppercase hover:opacity-95 disabled:opacity-85"
          >
            Create Listing
          </button>
        </form>
      </div>
  );
}