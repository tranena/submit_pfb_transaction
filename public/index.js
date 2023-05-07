
$(function () {
    // namespace_id
    const nBytes = new Uint8Array(8); // 8 random bytes
    window.crypto.getRandomValues(nBytes);
    const namespace_id = Array.from(nBytes, (byte) =>
        byte.toString(16).padStart(2, "0")
    ).join("");
    $("#namespace_id").val(namespace_id)
    console.log(namespace_id)

});