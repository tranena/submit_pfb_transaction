
$(function () {
    // namespace_id
    const nBytes = new Uint8Array(8); // 8 random bytes
    window.crypto.getRandomValues(nBytes);
    const namespace_id = Array.from(nBytes, (byte) =>
        byte.toString(16).padStart(2, "0")
    ).join("");
    $("#namespace_id").val(namespace_id)


    $('#form').submit(function (event) {
        event.preventDefault();

        $('#tx_result').html("executing...");

        $.ajax({
            url: '/',
            method: 'POST',
            data: $(this).serialize(),
            success: function (result) {
                $('#tx_result').html("<span style='color:green'>Submit Success</span>");
                const result_json = JSON.parse(result)
                console.log(result)
                $('#height').html(result_json["height"]);
                $('#txhash').html("<a target='_blank' href='https://testnet.mintscan.io/celestia-incentivized-testnet/txs/" + result_json["txhash"] + "?height=" + result_json["height"] + "'>" + result_json["txhash"] + "</a>");
                $('#tx_info').show();
            },
            error: function (error) {
                $('#tx_result').html("<span style='color:red'>Failed,Please make sure your node is available and try again!</span>");
            }
        });
    });
});