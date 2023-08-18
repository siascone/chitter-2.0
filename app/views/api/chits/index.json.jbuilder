json.chits do 
    @chits.each do |chit|
        json.set! chit.id do 
            json.extract! chit, :id, :body
        end
    end
end