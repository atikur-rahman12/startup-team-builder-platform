paginatedUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        {/* USER IMAGE */}
                        <td className="py-4">
                          <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden flex items-center justify-center bg-linear-to-br from-violet-500 to-indigo-600 text-white font-bold text-sm shadow-md">
                            {user.image ? (
                              <Image
                                src={user.image}
                                alt={user.name || "User"}
                                height={85}
                                width={85}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              (() => {
                                const nameParts = (user.name || "")
                                  .trim()
                                  .split(" ");
                                const firstInitial =
                                  nameParts[0]?.charAt(0).toUpperCase() || "";
                                const lastInitial =
                                  nameParts.length > 1
                                    ? nameParts[nameParts.length - 1]
                                        .charAt(0)
                                        .toUpperCase()
                                    : "";

                                return `${firstInitial}${lastInitial}`;
                              })()
                            )}
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td className="py-4 text-center text-slate-300">
                          {user.email}
                        </td>

                        {/* ROLE */}
                        <td className="py-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-violet-500/20 via-fuchsia-500/20 to-purple-500/20 text-violet-200 text-xs font-semibold capitalize shadow-lg shadow-violet-500/20">
                            {user.role}
                          </span>
                        </td>

                        {/* PREMIUM */}
                        <td className="py-4 text-center">
                          {user.isPremium ? (
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                              Premium
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-slate-700/30 text-slate-300 text-xs font-bold border border-white/5">
                              Free
                            </span>
                          )}
                        </td>

                        {/* STATUS */}
                        <td className="py-4 text-center">
                          {user.isBlocked ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                              <XCircle size={13} />
                              Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                              <CheckCircle2 size={13} />
                              Active
                            </span>
                          )}
                        </td>

                        {/* ACTION BUTTONS */}
                        <td className="py-4 text-center">
                          {user.isBlocked ? (
                            <button
                              onClick={() => handleToggleBlock(user._id, false)}
                              className="px-4 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleBlock(user._id, true)}
                              className="px-4 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}