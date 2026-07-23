import { useEffect, useState } from "react";
import {
    createPlaylist,
    getMyPlaylists,
} from "../services/playlistService";

function Playlists() {

    const [name, setName] = useState("");

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {

        const data = await getMyPlaylists();

        setPlaylists(data.playlists);

    };

    const handleCreate = async () => {

        if (!name.trim()) return;

        await createPlaylist(name);

        setName("");

        loadPlaylists();

    };

    return (

        <div className="p-8 text-white">

            <h1 className="text-4xl font-bold mb-8">
                🎵 My Playlists
            </h1>

            <div className="flex gap-4 mb-8">

                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="Playlist name"
                    className="bg-zinc-800 px-4 py-3 rounded-lg flex-1"
                />

                <button
                    onClick={handleCreate}
                    className="bg-purple-600 px-6 rounded-lg"
                >
                    Create
                </button>

            </div>

            <div className="space-y-4">

                {playlists.map((playlist) => (

                    <div
                        key={playlist._id}
                        className="bg-zinc-900 rounded-xl p-5"
                    >

                        <h2 className="text-2xl font-bold">
                            {playlist.name}
                        </h2>

                        <p className="text-gray-400 mt-2">
                            {playlist.videos.length} Videos
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Playlists;